package com.optimuscrime.trdosl.utility

import com.optimuscrime.trdosl.services.db.domain.EventConfig
import com.optimuscrime.trdosl.services.db.domain.EventConfigType
import com.optimuscrime.trdosl.services.system.domain.PlayerPoints
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

internal class CalculatePlayerPointsRankingAndEliminationTest {
    @Test
    fun testSorting() {
        val eventConfig = EventConfig(
            eventId = 1,
            type = EventConfigType.ACCUMULATE
        )

        val player1 = PlayerPoints(
            relationId = 1,
            playerId = 1,
            chipPlayed = null,
            eliminatedBefore = false
        )
        player1.addAccumulatedPoints(10)
        player1.addAccumulatedTransferCost(2)

        val player2 = PlayerPoints(
            relationId = 2,
            playerId = 2,
            chipPlayed = null,
            eliminatedBefore = false
        )
        player2.addAccumulatedPoints(10)

        val player3 = PlayerPoints(
            relationId = 3,
            playerId = 3,
            chipPlayed = null,
            eliminatedBefore = false
        )
        player3.addAccumulatedPoints(100)

        val playerPoints = arrayOf(player3, player1, player2)

        val result = calculatePlayerPointsRankingAndElimination(playerPoints, eventConfig)

        Assertions.assertEquals(3, result.size)

        // Player 3 = 100 points
        Assertions.assertEquals(3, result[0].playerId)
        Assertions.assertEquals(1, result[0].rank)

        // Player 2 = 10 points
        Assertions.assertEquals(2, result[1].playerId)
        Assertions.assertEquals(2, result[1].rank)

        // Player 3 = 8 points (10 - 2)
        Assertions.assertEquals(1, result[2].playerId)
        Assertions.assertEquals(3, result[2].rank)
    }

    @Test
    fun testElimination() {
        val eventConfig = EventConfig(
            eventId = 1,
            type = EventConfigType.ELIMINATE,
            eliminateCount = 2
        )

        val player1 = PlayerPoints(
            relationId = 1,
            playerId = 1,
            chipPlayed = null,
            eliminatedBefore = false
        )
        player1.addAccumulatedPoints(100)

        val player2 = PlayerPoints(
            relationId = 2,
            playerId = 2,
            chipPlayed = null,
            eliminatedBefore = false
        )
        player2.addAccumulatedPoints(10)

        val player3 = PlayerPoints(
            relationId = 3,
            playerId = 3,
            chipPlayed = null,
            eliminatedBefore = false
        )
        player3.addAccumulatedPoints(1)

        val player4 = PlayerPoints(
            relationId = 4,
            playerId = 4,
            chipPlayed = null,
            eliminatedBefore = false
        )
        player4.addAccumulatedPoints(50)

        val playerPoints = arrayOf(player1, player2, player3, player4)

        val result = calculatePlayerPointsRankingAndElimination(playerPoints, eventConfig)

        Assertions.assertEquals(4, result.size)

        // Player 1, 100 points, rank 1
        Assertions.assertEquals(1, result[0].playerId)
        Assertions.assertFalse(result[0].eliminatedNow)

        // Player 2, 10 points, rank 3
        Assertions.assertEquals(2, result[2].playerId)
        Assertions.assertTrue(result[2].eliminatedNow)

        // Player 3, 1 point, rank 4
        Assertions.assertEquals(3, result[3].playerId)
        Assertions.assertTrue(result[3].eliminatedNow)

        // Player 4, 50 points, rank 2
        Assertions.assertEquals(4, result[1].playerId)
        Assertions.assertFalse(result[1].eliminatedNow)
    }
}