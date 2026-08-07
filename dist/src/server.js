"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT || 3000;
(0, app_1.startApp)()
    .then(() => {
    app_1.app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Failed to start app', error);
    process.exit(1);
});
