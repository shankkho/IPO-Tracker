
const API_URL = "https://www.xflot.com/api/public/market/ipos";

export async function getIPOs() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(
        `IPO API request failed: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();

    console.log("IPO API Response:", result);

    // Handle different API response formats
    const ipos = Array.isArray(result)
      ? result
      : Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result?.ipos)
          ? result.ipos
          : [];

    return ipos.map((ipo, index) => ({
      id:
        ipo.id ??
        ipo.slug ??
        `${ipo.symbol || ipo.name || "ipo"}-${index}`,

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
        (
          ipo.minPrice != null && ipo.maxPrice != null
            ? `₹${ipo.minPrice} - ₹${ipo.maxPrice}`
            : "-"
        ),

      lotSize:
        ipo.lotSize ??
        ipo.lot_size ??
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
        ipo.subscription ??
        ipo.subscriptionRate ??
        "-",

      issueSize:
        ipo.issueSize ??
        ipo.issue_size ??
        "-",

      board:
        ipo.board ||
        ipo.issueType ||
        "-",

      gmp:
        ipo.gmp ?? "-",

      rawData: ipo,
    }));
  } catch (error) {
    console.error("Failed to fetch IPO data:", error);

    throw new Error(
      `Unable to fetch IPO data: ${error.message}`,
      { cause: error }
    );
  }
}