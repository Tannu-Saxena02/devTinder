const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest");

// This job will run at 8 AM in the morning everyday
cron.schedule("0 8 * * *", async () => { //* * * * *
  // Send emails to all people who got requests the previous day
  try {
    const yesterday = subDays(new Date(), 1);// for testing purpose 0 for today

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    console.log(listOfEmails);

    for (const email of listOfEmails) {
      // Send Emails
      try {
        const res = await sendEmail.run(
          "New Friend Requests pending for " + email,
          "Ther are so many friend requests pending, please login to DevConnect.world and accept or reject the requests."
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
});