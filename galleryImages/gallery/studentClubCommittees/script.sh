for f in *.jpg
do
	filename=$(basename -- "$f")
	extension="${filename##*.}"
	filename="${filename%.*}"
	echo "$filename $extension"
	cwebp -q 0 $f -o ../../placeholder/studentClubCommittees/$filename.webp
done
