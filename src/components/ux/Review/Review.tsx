"use client"
import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

// Erstelle die Funktionale Komponente
const Review = () => {
    const featurableWidgetId = "549a2a65-e269-492c-a2d8-7f14a0bc4fd6";
    return (
        <ReactGoogleReviews layout="badge" featurableId={featurableWidgetId} />
    );
};

export default Review;
 