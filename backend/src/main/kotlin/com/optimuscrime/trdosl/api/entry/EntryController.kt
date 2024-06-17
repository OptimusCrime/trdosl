package com.optimuscrime.trdosl.api.entry

import com.optimuscrime.trdosl.api.entry.dto.tournament.DTOEntriesResponse
import com.optimuscrime.trdosl.services.db.DbService
import com.optimuscrime.trdosl.services.db.exceptions.ResourceNotFoundException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@Controller
class EntryController(
    @Autowired private val dbService: DbService,
) {
    private val logger: Logger = LoggerFactory.getLogger(EntryController::class.java)

    @RequestMapping(
        "/v1/entries",
        method = [RequestMethod.GET],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    @CrossOrigin(origins = ["http://localhost:3000"])
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

            logger.error("Caught unexpected error when trying to return tournament information", ex)
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}