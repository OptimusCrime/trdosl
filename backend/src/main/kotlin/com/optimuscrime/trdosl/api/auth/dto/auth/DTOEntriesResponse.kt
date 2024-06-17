package com.optimuscrime.trdosl.api.entry.dto.entry

import com.optimuscrime.trdosl.services.db.domain.Entry

data class AuthData (
    val token: String
)

data class DTOAuthResponse (
    val data: AuthData
)