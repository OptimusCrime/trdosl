package com.optimuscrime.trdosl.api.auth.dto

data class AuthData (
    val token: String
)

data class DTOAuthResponse (
    val data: AuthData
)