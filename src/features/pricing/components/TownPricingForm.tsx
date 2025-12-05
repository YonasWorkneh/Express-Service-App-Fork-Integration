"use client";

import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import SuccessModal from "@/components/common/SuccessModal";
import PricingFormHeader from "./PricingFormHeader";
import ServiceTypeSection from "./ServiceTypeSection";
import AdditionalChargesSection from "./AdditionalChargesSection";
import ActionButtons from "./ActionButtons";

const TownPricingSchema = Yup.object().shape({
  standard: Yup.number()
    .min(0, "Price must be positive")
    .required("Standard service price is required"),
  sameDay: Yup.number()
    .min(0, "Price must be positive")
    .required("Same Day service price is required"),
  overnight: Yup.number()
    .min(0, "Price must be positive")
    .required("Overnight service price is required"),
  costPerKm: Yup.number()
    .min(0, "Cost must be positive")
    .required("Cost per km is required"),
  profitMargin: Yup.number()
    .min(0, "Profit margin must be positive")
    .max(100, "Profit margin cannot exceed 100%")
    .required("Profit margin is required"),
});

export default function TownPricingForm() {
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [expandedSection, setExpandedSection] = useState<
    "standard" | "sameDay" | "overnight" | null
  >("standard");

  const initialValues = {
    zone: "town",
    standard: 0,
    sameDay: 0,
    overnight: 0,
    costPerKm: 0,
    profitMargin: 0,
    driverCommission: [
      { category: "bicycle", costPerKm: 0, fixedCost: 0, driverCost: 0 },
      { category: "scooter", costPerKm: 0, fixedCost: 0, driverCost: 0 },
      { category: "motorcycle", costPerKm: 0, fixedCost: 0, driverCost: 0 },
      { category: "automobile", costPerKm: 0, fixedCost: 0, driverCost: 0 },
      { category: "cargo car", costPerKm: 0, fixedCost: 0, driverCost: 0 },
    ],
  };

  const handleSubmit = (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("Town Pricing Data:", values);
    setSuccessMessage("Town pricing configuration saved successfully!");
    setIsSuccessModalOpen(true);

    setTimeout(() => {
      resetForm();
    }, 1000);
  };

  const handleCloseModal = () => {
    setIsSuccessModalOpen(false);
    navigate("/pricing");
  };

  return (
    <div className="max-w-4xl p-6 bg-white">
      <Formik
        initialValues={initialValues}
        validationSchema={TownPricingSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <PricingFormHeader title="Town Pricing Configuration" />

            <ServiceTypeSection
              serviceName="Standard Service"
              serviceLabel="Standard Service Price"
              fieldName="standard"
              error={errors.standard}
              touched={touched.standard}
              isExpanded={expandedSection === "standard"}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === "standard" ? null : "standard"
                )
              }
              showWeightRanges={false}
            />

            <ServiceTypeSection
              serviceName="Same Day Service"
              serviceLabel="Same Day Service Price"
              fieldName="sameDay"
              error={errors.sameDay}
              touched={touched.sameDay}
              isExpanded={expandedSection === "sameDay"}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === "sameDay" ? null : "sameDay"
                )
              }
              showWeightRanges={false}
            />

            <ServiceTypeSection
              serviceName="Overnight Service"
              serviceLabel="Overnight Service Price"
              fieldName="overnight"
              error={errors.overnight}
              touched={touched.overnight}
              isExpanded={expandedSection === "overnight"}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === "overnight" ? null : "overnight"
                )
              }
              showWeightRanges={false}
            />

            <AdditionalChargesSection
              profitMarginError={errors.profitMargin}
              profitMarginTouched={touched.profitMargin}
              driverCommission={values.driverCommission}
            />

            <ActionButtons />
          </Form>
        )}
      </Formik>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseModal}
        trackingNumber={successMessage}
      />
    </div>
  );
}
