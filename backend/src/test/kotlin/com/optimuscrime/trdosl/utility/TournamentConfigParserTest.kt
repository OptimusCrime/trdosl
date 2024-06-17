package com.optimuscrime.trdosl.utility

import com.optimuscrime.trdosl.services.db.domain.EventConfigType
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows

internal class TournamentConfigParserTest {
    @Test
    fun testUnknownVersion() {
        assertThrows<Error> {
            parseTournamentConfig("V000")
        }
    }

    @Test
    fun testVerifyParsing() {
        val response = parseTournamentConfig("V001|0|SE1|A|A|E44|A|E1")
        Assertions.assertEquals(7, response.size)

        // First event
        Assertions.assertEquals(EventConfigType.NULL, response[0].type)
        Assertions.assertEquals(1, response[0].eventId)
        Assertions.assertFalse(response[0].start)

        // Second event
        Assertions.assertEquals(EventConfigType.ELIMINATE, response[1].type)
        Assertions.assertEquals(1, response[1].eliminateCount)
        Assertions.assertEquals(2, response[1].eventId)
        Assertions.assertTrue(response[1].start)

        // Third event
        Assertions.assertEquals(EventConfigType.ACCUMULATE, response[2].type)
        Assertions.assertEquals(3, response[2].eventId)
        Assertions.assertFalse(response[2].start)

        // Fourth event
        Assertions.assertEquals(EventConfigType.ACCUMULATE, response[3].type)
        Assertions.assertEquals(4, response[3].eventId)

        // Fifth event
        Assertions.assertEquals(EventConfigType.ELIMINATE, response[4].type)
        Assertions.assertEquals(44, response[4].eliminateCount)
        Assertions.assertEquals(5, response[4].eventId)

        // Sixth event
        Assertions.assertEquals(EventConfigType.ACCUMULATE, response[5].type)
        Assertions.assertEquals(6, response[5].eventId)

        // Seventh and final event
        Assertions.assertEquals(EventConfigType.ELIMINATE, response[6].type)
        Assertions.assertEquals(1, response[6].eliminateCount)
        Assertions.assertEquals(7, response[6].eventId)
    }

    @Test
    fun testVerifyParsing2() {
        val response = parseTournamentConfig(
            "V001|A|E4|A|E4|A|E4|A|E4|A|E4|A|E3|A|E3|A|E3|A|E3|A|E3|A|E3|A|E3|A|E3|A|E3|A|E3|A|E2|A|E2|A|E2|A|E1"
        )

        val eliminations = response.map { it.eliminateCount}.reduce { acc, i -> acc + i }
        Assertions.assertEquals(57, eliminations)
    }
}