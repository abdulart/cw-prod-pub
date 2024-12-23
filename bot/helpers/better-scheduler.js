const BATCH_SIZE = 50; // Number of messages to send concurrently
const MAX_RETRIES = 3; // Maximum retries for failed messages


async function sendMessage(user) {
    try {
        // Replace with your actual sendMessage logic
        console.log(`Sending message to user ${user.id}`);
        if (Math.random() < 0.2) throw new Error("Random send failure"); // Simulated failure
        return { success: true, user };
    } catch (error) {
        return { success: false, user, error };
    }
}


async function processBatch(users) {
    const results = await Promise.allSettled(users.map(sendMessage));
    const failedMessages = results
        .filter(result => result.status === "fulfilled" && !result.value.success)
        .map(result => result.value);
    const failedDueToRejection = results
        .filter(result => result.status === "rejected")
        .map(result => ({ user: result.reason.user, error: result.reason }));

    return [...failedMessages, ...failedDueToRejection];
}


async function processUsers(users) {
    const failedUsers = [];
    for (let i = 0; i < users.length; i += BATCH_SIZE) {
        const batch = users.slice(i, i + BATCH_SIZE);
        const failed = await processBatch(batch);
        failedUsers.push(...failed);
    }
    return failedUsers;
}


async function retryFailedMessages(failedMessages) {
    let retries = 0;
    while (retries < MAX_RETRIES && failedMessages.length > 0) {
        console.log(`Retrying failed messages: Attempt ${retries + 1}`);
        const newFailures = await processBatch(failedMessages.map(f => f.user));
        failedMessages = newFailures;
        retries++;
    }
    return failedMessages;
}


// Example Usage
(async function main() {
    const users = Array.from({ length: 200 }, (_, i) => ({ id: i + 1 })); // Simulated user list
    const failedMessages = await processUsers(users);
    const unrecoverableFailures = await retryFailedMessages(failedMessages);

    if (unrecoverableFailures.length > 0) {
        console.log("Failed to send messages to the following users:", unrecoverableFailures);
    } else {
        console.log("All messages sent successfully!");
    }
})();