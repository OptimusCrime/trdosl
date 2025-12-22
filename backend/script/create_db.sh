rm -f ../database/trdosl.db
touch ../database/trdosl.db
sqlite3 ../database/trdosl.db "VACUUM;"