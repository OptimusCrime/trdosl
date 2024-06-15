import math

def calculate_destination(lat_start, lon_start, distance, bearing):
    R = 6371000  # Radius of the Earth in meters

    # Convert input from degrees to radians
    lat_start = math.radians(lat_start)
    lon_start = math.radians(lon_start)
    bearing = math.radians(bearing)

    # Calculate the destination point
    lat_end = math.asin(math.sin(lat_start) * math.cos(distance / R) +
                        math.cos(lat_start) * math.sin(distance / R) * math.cos(bearing))

    lon_end = lon_start + math.atan2(math.sin(bearing) * math.sin(distance / R) * math.cos(lat_start),
                                     math.cos(distance / R) - math.sin(lat_start) * math.sin(lat_end))

    # Convert result back to degrees
    lat_end = math.degrees(lat_end)
    lon_end = math.degrees(lon_end)

    return lat_end, lon_end

# Example usage
lat_start = 52.2296756  # Starting latitude
lon_start = 21.0122287  # Starting longitude
distance = 10000        # Distance in meters (10 km)
bearing = 90            # Bearing in degrees (East)

lat_end, lon_end = calculate_destination(lat_start, lon_start, distance, bearing)
print(f"New latitude: {lat_end}, New longitude: {lon_end}")
