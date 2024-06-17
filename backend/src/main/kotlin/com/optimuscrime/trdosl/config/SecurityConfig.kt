package com.optimuscrime.trdosl.config
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
class SecurityConfig {
    @Bean
    @Throws(Exception::class)
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        // Let me in god damnit
        return http
            .csrf { csrf -> csrf.disable()}
            .httpBasic { httpBasic -> httpBasic.disable() }
            .authorizeHttpRequests { requests -> requests.anyRequest().permitAll()}
            .build()
    }
}