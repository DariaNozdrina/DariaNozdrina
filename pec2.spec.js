import dummy_list_coins_response from "../dummies/dummy_list_coins_response";
import testServer from "@apto-payments/test-server";
import {
    listCoins,
    listCoinsPromise,
    serialize,
    getPrice,
    getTopPrices,
} from "./pec2";

describe("PEC2", () => {
    describe("Ex0", () => {
        beforeEach(() => {
            // Prevent calls to the real server to avoid network errors
            testServer.stubJSONResponse({
                method: "get",
                path: "https://api.coingecko.com/api/v3/coins/list",
                response: dummy_list_coins_response,
            });
        });

        describe("listCoins", () => {
            it("should be defined as a function", () => {
                expect(listCoins).toBeDefined();
            });

            it("should return an instance of XMLHttpRequest", () => {
                const actual = listCoins(1, jest.fn());
                expect(actual).toBeInstanceOf(XMLHttpRequest);
            });

            it("should execute the callback passing the N first 10 symbols sorted alphabetically", (done) => {
                listCoins(10, function(args) {
                    expect(args).toEqual(top10Coins);
                    done();
                });
            });

            it("should execute the callback passing the N first 12 symbols sorted alphabetically", (done) => {
                listCoins(12, function(args) {
                    expect(args).toEqual(top12Coins);
                    done();
                });
            });
        });

        describe("listCoinsPromise", () => {
            it("listCoinsPromise should be a defined function", () => {
                expect(listCoinsPromise).toBeDefined();
            });

            it("should return a promise that is resolved with a list of top 10 coins when called with n=10", () => {
                return listCoinsPromise(10).then((coins) => {
                    expect(coins).toEqual(top10Coins);
                });
            });

            it("should return a promise that is resolved with a list of top 12 coins when called with n=12", () => {
                return listCoinsPromise(12).then((coins) => {
                    expect(coins).toEqual(top12Coins);
                });
            });
        });
    });

    describe("Ex1", () => {
        describe(".serialize(p1, p2, p3)", () => {
            it("should be defined", () => {
                expect(serialize).toBeDefined();
            });

            it("should serialize the execution of the 3 given promises", () => {
                const p1 = new Promise((resolve) => resolve("A"));
                const p2 = new Promise((resolve) => resolve("B"));
                const p3 = new Promise((resolve) => resolve("C"));

                return expect(serialize(p1, p2, p3)).resolves.toEqual("ABC");
            });
        });
    });

    describe("Ex2", () => {
        beforeEach(() => {
            testServer.use(
                testServer.rest.get(
                    "https://api.coingecko.com/api/v3/simple/price",
                    (req, res, ctx) => {
                        const query = req.url.searchParams;
                        const ids = query.get("ids");
                        const vs_currencies = query.get("vs_currencies");

                        if (ids.includes("bitcoin") && vs_currencies.includes("usd")) {
                            return res(ctx.json({ bitcoin: { usd: 1111 } }), ctx.status(200));
                        }

                        if (ids.includes("ethereum") && vs_currencies.includes("usd")) {
                            return res(
                                ctx.json({ ethereum: { usd: 2222 } }),
                                ctx.status(200)
                            );
                        }

                        return res(ctx.json({}), ctx.status(200));
                    }
                )
            );
        });

        it("should return a promise that resolves with the price in USD", async() => {
            const spy = jest.spyOn(window, "fetch");
            expect(spy).toHaveBeenCalledTimes(0);
            const actual = await getPrice("bitcoin");
            expect(actual).toEqual(1111);
            expect(spy).toHaveBeenCalledTimes(1);

            const actual2 = await getPrice("ethereum");
            expect(actual2).toEqual(2222);
            expect(spy).toHaveBeenCalledTimes(2);

            spy.mockRestore();
        });
    });

    describe("Ex3", () => {
        beforeEach(() => {
            testServer.printHandlers();

            testServer.stubJSONResponse({
                method: "get",
                path: "https://api.coingecko.com/api/v3/coins/list",
                response: dummy_list_coins_response,
            });

            testServer.use(
                testServer.rest.get(
                    "https://api.coingecko.com/api/v3/simple/price",
                    (req, res, ctx) => {
                        const query = req.url.searchParams;
                        const ids = query.get("ids");

                        if (Object.keys(_prices).includes(ids)) {
                            return res(
                                ctx.json({
                                    [ids]: { usd: _prices[ids] }
                                }),
                                ctx.status(200)
                            );
                        }

                        return res(ctx.json({}), ctx.status(200));
                    }
                )
            );
        });

        it("should return the list of prices", async() => {
            const actual = await getTopPrices(3);

            expect(actual).toEqual([
                { id: "$AOW", price: 1 },
                { id: "$ShibX", price: 2 },
                { id: "$UP", price: 3 },
            ]);
        });
    });

    const top10Coins = [
        "$AOW",
        "$ShibX",
        "$UP",
        "$aapl",
        "$ads",
        "$anrx",
        "$babydogeinu",
        "$based",
        "$blow",
        "$caseclosed",
    ];

    const top12Coins = [
        "$AOW",
        "$ShibX",
        "$UP",
        "$aapl",
        "$ads",
        "$anrx",
        "$babydogeinu",
        "$based",
        "$blow",
        "$caseclosed",
        "$crdn",
        "$dpace",
    ];

    const _prices = {
        $AOW: 1,
        $ShibX: 2,
        $UP: 3,
        $aapl: 4,
        $ads: 5,
        $anrx: 6,
        $babydogeinu: 7,
        $based: 8,
        $blow: 9,
        $caseclosed: 10,
        $crdn: 11,
        $dpace: 12,
    };
});