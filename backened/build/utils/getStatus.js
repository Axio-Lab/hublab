"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatus = void 0;
function getStatus(event) {
    const today = new Date();
    if (event.startDate > today) {
        return 'Upcoming';
    }
    else if (event.endDate < today) {
        return 'Closed';
    }
    else {
        return 'Ongoing';
    }
}
exports.getStatus = getStatus;
