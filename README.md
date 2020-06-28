# algorand-participation
Abstract the 3 `goal` commands integral to Algorand participation through a purposefully simple HTTP interface.
One does not need to run a node to collect rewards, only to be correctly
[marked online or offline](https://algorand.foundation/rewards-faq).

This service assumes you already have 1,000 microalgos in your [Algorand wallet](https://www.algorand.com/wallet)
to cover the [change onlines status](https://developer.algorand.org/docs/reference/cli/goal/account/changeonlinestatus/)
transaction.
[1 algo](https://coinmarketcap.com/currencies/algorand/) = 1,000,000 microalgos.
At time of publishing that works out to 200 transactions for $0.2USD.

### To participate in the network
1. `docker run -d -p 4243:3048 --env ALGORAND_DATA=/var/lib/algorand --volume algorand_volume:/var/lib/algorand vraidsys/algorand-participation:1.0.0`
1. Start the containerized Algorand node: <http://localhost:4243/start>
1. Verify the containerized Algorand node is running: <http://localhost:4243/status>
1. Create a participation key (tied to your Algorand wallet address) valid for approximately the specified number of days: <http://localhost:4243/addpartkey/:algorandAddress/:daysToParticipate>
1. Go online with the Algorand wallet address: <http://localhost:4243/changeonlinestatus/:algorandAddress/true>

### To only collect rewards
1. `docker run -d -p 4242:3048 --env ALGORAND_DATA=/var/lib/algorand vraidsys/algorand-participation:1.0.0`
1. Start the containerized Algorand node: <http://localhost:4243/start>
1. Verify the containerized Algorand node is running: <http://localhost:4243/status>
1. Go offline with the Algorand wallet address: <http://localhost:4243/changeonlinestatus/:algorandAddress/false>
