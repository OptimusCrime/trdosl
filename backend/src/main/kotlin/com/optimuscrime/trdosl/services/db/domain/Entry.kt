package com.optimuscrime.trdosl.services.db.domain

import java.util.*

enum class EntryType(val value: String) {
    RUN("run"), WALK("walk"), TREADMILL("treadmill")
}

fun stringToEntryType(value: String?): EntryType = when(value) {
    EntryType.RUN.value -> EntryType.RUN
    EntryType.WALK.value -> EntryType.WALK
    EntryType.TREADMILL.value -> EntryType.TREADMILL
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