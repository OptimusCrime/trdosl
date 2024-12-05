package com.optimuscrime.trdosl.api.entry.dto

import com.optimuscrime.trdosl.services.db.domain.EntryType

data class DTOEntryCreatePayload(
    val date: String,
    val type: EntryType,
    val runTime: String,
    val runDistance: Int,
    val comment: String?,
)