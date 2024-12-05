package com.optimuscrime.trdosl

import jakarta.annotation.PostConstruct
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import java.util.*

@SpringBootApplication
class TrdOslApplication {
	@PostConstruct
	fun executeAfterMain() {
		TimeZone.setDefault(TimeZone.getTimeZone("Europe/Oslo"))
	}
}

fun main(args: Array<String>) {
	runApplication<TrdOslApplication>(*args)
}
