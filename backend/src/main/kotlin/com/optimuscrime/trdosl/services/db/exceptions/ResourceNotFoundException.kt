package com.optimuscrime.trdosl.services.db.exceptions

class ResourceNotFoundException : Exception {
    constructor(message: String) : super(message)
    constructor(message: String, ex: Exception) : super(message, ex)
}