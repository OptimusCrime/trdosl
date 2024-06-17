package com.optimuscrime.trdosl.services.db

import com.optimuscrime.trdosl.services.db.domain.*
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service
import java.sql.ResultSet

@Service
class DbService(
    @Autowired private val jdbcTemplate: JdbcTemplate
) {
    private val logger: Logger = LoggerFactory.getLogger(DbService::class.java)

    /////////////////////////////////////////////////////////////////////
    // Entries
    /////////////////////////////////////////////////////////////////////

    fun getEntries(): Array<Entry> {
        val sql = """
            SELECT 
              id, 
              type,
              run_date,
              run_distance,
              run_time,
              created_at
            FROM 
              entry
            ORDER BY run_date DESC
            """.trimIndent()

        return jdbcTemplate.query(sql) { rs: ResultSet, _: Int ->
            Entry(
                id = rs.getInt("id"),
                type = stringToEntryType(rs.getString("type")),
                runDate = rs.getDate("run_date"),
                runDistance = rs.getInt("run_distance"),
                runTime = rs.getString("run_time"),
                createdAt = rs.getDate("created_at")
            )
        }.toTypedArray()
    }
}