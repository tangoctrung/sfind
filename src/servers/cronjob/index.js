import { sendMessageTelegram } from '@/utils/handleBotTelegram';
import { CronJob } from 'cron';
import https from "https";

const URL = "https://sfind.onrender.com";

const job = new CronJob("*/10 * * * *", function () {
	https
		.get(URL, (res) => {
			if (res.statusCode === 200) {
				// sendMessageTelegram("Ping host sfind.onrender.com success");
			} else {
				// sendMessageTelegram("Ping host sfind.onrender.com fail: " + res.statusMessage);
			}
		})
		.on("error", (e) => {
			// sendMessageTelegram("Ping host sfind.onrender.com fail: " + e?.message);
		});
});

export default job;