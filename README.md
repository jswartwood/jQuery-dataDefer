# jQuery dataDefer

This plugin enhances jQuery data functionality.  It allows a developer to write lazy data setter functions,
allowing expensive lookups to be done only when requested, and cached for subsequent getter calls.  Obviously,
dataDefer should not replace all calls to data([key], [value]), but it works well for DOM query results, string
parsing, remapping arrays or objects, etc.  It is pretty magical for storing references for widget elements.

---

## Quick usage

	// I know I might need a list of the first 1000 fibonacci numbers
	$(document).dataDefer("fibonacci", function() {
		var n = [1,1],
			series = n[0] + " + " + n[1];
		
		for (var i = 0; i < 1000; i++) {
			series += " + " + (n[i % 2] = n[0] + n[1]);
		}
		return series + "...";
	});
	
	// I could wait a few seconds after the pages loads to calculate
	setTimeout(function() {
		$(document).data("fibonacci");
	}, 3000);
	
	// But... I need it right now
	$(document).data("fibonacci");
