package com.optimuscrime.trdosl.services.db.domain

import java.time.LocalDate
import java.util.*

enum class EntryType(val value: String) {
    RUN("run"), WALK("walk"), THREADMILL("threadmill")
}

fun stringToEntryType(value: String?): EntryType = when(value) {
    EntryType.RUN.value -> EntryType.RUN
    EntryType.WALK.value -> EntryType.WALK
    EntryType.THREADMILL.value -> EntryType.THREADMILL
    else -> throw Exception("Invalid values passed as type")
}

data class Entry(
    val id: Int,
    val type: EntryType,
    val runDate: Date,
    val runDistance: Int,
    val runTime: String,
    val comment: String?,
    val createdAt: Date,
)