package com.optimuscrime.trdosl.services.db

import com.optimuscrime.trdosl.services.db.exceptions.DatabaseException
import com.optimuscrime.trdosl.services.db.exceptions.ResourceNotFoundException
import com.optimuscrime.trdosl.services.db.domain.Entry
import com.optimuscrime.trdosl.services.db.domain.EntryType
import com.optimuscrime.trdosl.services.db.domain.stringToEntryType
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service
import java.sql.Date
import java.sql.ResultSet

@Service
class DbService(
    @Autowired private val jdbcTemplate: JdbcTemplate
) {
    fun getEntries(): Array<Entry> {
        val sql = """
            SELECT 
              id, 
              type,
              run_date,
              run_distance,
              run_time,
              comment,
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
                comment = rs.getString("comment") ?: null,
                createdAt = rs.getDate("created_at")
            )
        }.toTypedArray()
    }

    fun getEntry(entryId: Int): Entry {
        val sql = """
            SELECT 
              id, 
              type,
              run_date,
              run_distance,
              run_time,
              comment,
              created_at
            FROM 
              entry
            WHERE 
              id = ?
            """.trimIndent()

        try {
            val entry = jdbcTemplate.queryForObject(sql, { rs: ResultSet, _: Int ->
                Entry(
                    id = rs.getInt("id"),
                    type = stringToEntryType(rs.getString("type")),
                    runDate = rs.getDate("run_date"),
                    runDistance = rs.getInt("run_distance"),
                    runTime = rs.getString("run_time"),
                    comment = rs.getString("comment") ?: null,
                    createdAt = rs.getDate("created_at")
                )
            }, entryId)

            if (entry == null) {
                throw ResourceNotFoundException("Could not find entry")
            }

            return entry
        } catch (ex: Exception) {
            if (ex is EmptyResultDataAccessException) {
                throw ResourceNotFoundException(
                    "Could not find entry. EntryId = $entryId",
                    ex
                )
            }

            throw DatabaseException("Unknown database exception", ex)
        }
    }

    fun deleteEntry(entryId: Int) {
        val sql = """
            DELETE FROM entry 
            WHERE id = ?
            """.trimIndent()

        jdbcTemplate.update(sql) { ps ->
            ps.setInt(1, entryId)
        }
    }

    fun createEntry(
        date: Date,
        type: EntryType,
        runDistance: Int,
        runTime: String,
        comment: String?
    ) {
        val sql = """
            INSERT INTO entry(
              type, run_date, run_distance, run_time, comment
            ) 
            VALUES (?::entry_type, ?, ?, ?, ?) 
            """.trimIndent()

        jdbcTemplate.update(sql) { ps ->
            ps.setString(1, type.value)
            ps.setDate(2, date)
            ps.setInt(3, runDistance)
            ps.setString(4, runTime)
            ps.setString(5, comment)
        }
    }
}