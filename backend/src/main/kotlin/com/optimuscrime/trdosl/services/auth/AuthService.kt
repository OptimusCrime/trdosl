package com.optimuscrime.trdosl.services.auth

import com.optimuscrime.trdosl.services.db.exceptions.AuthorizationException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.security.crypto.bcrypt.BCrypt
import org.springframework.stereotype.Service
import java.util.*


const val AUTH_TOKEN_ENV_NAME = "AUTH_TOKEN"
const val PASSWORD_ENV_NAME = "PINAPLEEEEE"

@Service
class AuthService {
    private val logger: Logger = LoggerFactory.getLogger(AuthService::class.java)

    /**
     * This may be the stupidest authorization check ever, but whatever. We keep it simple
     */
    fun verifyAuthorization(header: String) {
        val split = header.split(" ")
        if (split.size != 2) {
            throw AuthorizationException()
        }

        if (split[0].lowercase(Locale.getDefault()) != "bearer") {
            throw AuthorizationException()
        }

        // Sanity check. Make sure that we have provided an environment variable
        val authToken = this.getAuthToken()

        // Whatever...
        if (!authToken.equals(split[1])) {
            throw AuthorizationException()
        }
    }

    fun verifyLoginAndReturnToken(passwordPlaintext: String): String {
        val passwordHash = this.getPasswordHash()

        if (!BCrypt.checkpw(passwordPlaintext, passwordHash)) {
            throw AuthorizationException()
        }

        return this.getAuthToken()
    }

    private fun getPasswordHash(): String {
        return this.getEnvironmentVariable(PASSWORD_ENV_NAME)
    }

    private fun getAuthToken(): String {
        return this.getEnvironmentVariable(AUTH_TOKEN_ENV_NAME)
    }

    private fun getEnvironmentVariable(varName: String): String {
        // Sanity check. Make sure that we have the environment variable
        val envVariable = System.getenv(varName)
        if (envVariable == null || envVariable.isEmpty()) {
            logger.error("$varName is not set in environment!")
            throw AuthorizationException()
        }

        return envVariable
    }
}