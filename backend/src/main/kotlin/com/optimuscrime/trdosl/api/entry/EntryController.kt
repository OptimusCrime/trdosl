package com.optimuscrime.trdosl.api.entry

import com.optimuscrime.trdosl.api.entry.dto.DTOEntriesResponse
import com.optimuscrime.trdosl.api.entry.dto.DTOEntryCreatePayload
import com.optimuscrime.trdosl.services.db.DbService
import com.optimuscrime.trdosl.services.auth.AuthService
import com.optimuscrime.trdosl.services.db.exceptions.AuthorizationException
import com.optimuscrime.trdosl.services.db.exceptions.ResourceNotFoundException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.sql.Date

val runTimeExpression = """^[0-9]{2}:[0-9]{2}:[0-9]{2}$""".toRegex()

@Controller
class EntryController(
    @Autowired private val dbService: DbService,
    @Autowired private val authService: AuthService,
) {
    private val logger: Logger = LoggerFactory.getLogger(EntryController::class.java)

    @RequestMapping(
        "/v1/entries",
        method = [RequestMethod.GET],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    @CrossOrigin(origins = ["http://localhost:3000", "https://trdosl.optimuscrime.net", "https://noreg.optimuscrime.net"])
    @ResponseBody
    fun getEntries(): DTOEntriesResponse {
        try {
            val entries = dbService.getEntries()

            return DTOEntriesResponse(
                data = entries,
            )
        } catch (ex: Exception) {
            if (ex is ResourceNotFoundException) {
                logger.debug("Could not find resource", ex)
                throw ResponseStatusException(HttpStatus.NOT_FOUND)
            }

            logger.error("Caught unexpected error when trying to return entries", ex)
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @RequestMapping(
        "/v1/entry",
        method = [RequestMethod.POST],
        consumes = ["application/json"]
    )
    @CrossOrigin(origins = ["http://localhost:3000", "https://trdosl.optimuscrime.net", "https://noreg.optimuscrime.net"])
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun createEntry(
        @RequestBody body: DTOEntryCreatePayload,
        @RequestHeader("authorization") authorizationHeader: String
    ) {
        try {
            authService.verifyAuthorization(authorizationHeader)

            // Make sure that the time matches expected format
            if (!runTimeExpression.matches(body.runTime)) {
                logger.debug("Run time contains invalid data: ${body.runTime}")
                throw ResponseStatusException(HttpStatus.BAD_REQUEST)
            }

            val date = Date.valueOf(body.date)

            dbService.createEntry(
                date = date,
                type = body.type,
                runTime = body.runTime,
                runDistance = body.runDistance,
                comment = body.comment
            )
        } catch (ex: Exception) {
            if (ex is AuthorizationException) {
                logger.debug("User is trying to create an entry, but failed authorization")
                throw ResponseStatusException(HttpStatus.FORBIDDEN)
            }

            logger.error("Caught unexpected error when trying to create an entry", ex)
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @RequestMapping(
        "/v1/entry/{entryId}",
        method = [RequestMethod.DELETE],
    )
    @CrossOrigin(origins = ["http://localhost:3000", "https://trdosl.optimuscrime.net", "https://noreg.optimuscrime.net"])
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteEntry(
        @PathVariable(value = "entryId") entryId: Int,
        @RequestHeader("authorization") authorizationHeader: String
    ) {
        try {
            authService.verifyAuthorization(authorizationHeader)

            val entry = dbService.getEntry(entryId)

            dbService.deleteEntry(entry.id);

        } catch (ex: Exception) {
            if (ex is AuthorizationException) {
                logger.debug("User is trying to delete an entry, but failed authorization")
                throw ResponseStatusException(HttpStatus.FORBIDDEN)
            }

            if (ex is ResourceNotFoundException) {
                logger.debug("Could not find resource", ex)
                throw ResponseStatusException(HttpStatus.NOT_FOUND)
            }

            logger.error("Caught unexpected error when trying to delete an entry", ex)
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}