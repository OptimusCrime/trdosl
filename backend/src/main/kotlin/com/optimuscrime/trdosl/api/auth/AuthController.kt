package com.optimuscrime.trdosl.api.auth

import com.optimuscrime.trdosl.api.auth.dto.AuthData
import com.optimuscrime.trdosl.api.auth.dto.DTOAuthResponse
import com.optimuscrime.trdosl.services.auth.AuthService
import com.optimuscrime.trdosl.services.db.exceptions.AuthorizationException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@Controller
class AuthController(
    @Autowired private val authService: AuthService,
) {
    private val logger: Logger = LoggerFactory.getLogger(AuthController::class.java)

    @RequestMapping(
        "/v1/auth",
        method = [RequestMethod.POST],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    @CrossOrigin(origins = ["http://localhost:3000"])
    @ResponseBody
    fun postAuth(
        @RequestHeader("x-trdosl-password") password: String
    ): DTOAuthResponse {
        try {
            val token = authService.verifyLoginAndReturnToken(password)

            return DTOAuthResponse(
                data = AuthData(
                    token = token
                )
            )
        }
        catch (ex: Exception) {
            if (ex is AuthorizationException) {
                logger.debug("User failed login attempt")
                throw ResponseStatusException(HttpStatus.FORBIDDEN)
            }

            logger.error("Caught unexpected error when trying to login in", ex)
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}