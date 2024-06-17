package com.optimuscrime.trdosl.services.db.domain

data class CreateEntry(
    val type: EntryType,
    val runDistance: Int,
    val runTime: String,
    val comment: String?
)