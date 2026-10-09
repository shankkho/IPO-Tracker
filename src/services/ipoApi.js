const API_URL = "/api/public/market/ipos";

export async function getIPOs() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status}`
      );
    }

    const result = await response.json();

    console.log("IPO API Response:", result);

    const ipos = Array.isArray(result)
      ? result
      : result.data || result.ipos || [];

    return ipos.map((ipo, index) => ({
      id:
        ipo.id ||
        ipo.slug ||
        `${ipo.symbol || ipo.name}-${index}`,

      company:
        ipo.company ||
        ipo.name ||
        ipo.companyName ||
        "Unknown Company",

      symbol:
        ipo.symbol ||
        ipo.ticker ||
        "-",

      status:
        ipo.status ||
        "UNKNOWN",

      priceRange:
        ipo.priceBand ||
        ipo.price_range ||
        (ipo.minPrice && ipo.maxPrice
          ? `₹${ipo.minPrice} - ₹${ipo.maxPrice}`
          : "-"),

      lotSize:
        ipo.lotSize ||
        ipo.lot_size ||
        "-",

      openDate:
        ipo.openDate ||
        ipo.open_date ||
        ipo.biddingStartDate ||
        "-",

      closeDate:
        ipo.closeDate ||
        ipo.close_date ||
        ipo.biddingEndDate ||
        "-",

      listingDate:
        ipo.listingDate ||
        ipo.listing_date ||
        "-",

      subscription:
        ipo.subscription ||
        ipo.subscriptionRate ||
        "-",

      issueSize:
        ipo.issueSize ||
        ipo.issue_size ||
        "-",

      board:
        ipo.board ||
        ipo.issueType ||
        "-",

      gmp:
        ipo.gmp ||
        "-",

      rawData: ipo,
    }));
  } catch (error) {
    throw new Error("Unable to fetch IPO data", {
      cause: error,
    });
  }
}