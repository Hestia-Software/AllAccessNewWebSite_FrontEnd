
class Utils {

	static getBreakPoint(screens) {
		let breakpoints = []
		for (const key in screens) {
			if (screens.hasOwnProperty(key)) {
				const element = screens[key];
				if (element) {
					breakpoints.push(key)
				}
			}
		}
		return breakpoints
	}

	static calculateTotalFileSize = (files) => {
        return files.reduce((totalSize, file) => totalSize + file?.originFileObj?.size, 0);
    };

}

export default Utils;