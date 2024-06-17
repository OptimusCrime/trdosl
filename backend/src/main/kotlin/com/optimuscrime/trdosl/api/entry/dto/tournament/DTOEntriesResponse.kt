package com.optimuscrime.trdosl.api.entry.dto.tournament

import com.optimuscrime.trdosl.services.db.domain.Entry

data class DTOEntriesResponse (
    val data: Array<Entry>
)