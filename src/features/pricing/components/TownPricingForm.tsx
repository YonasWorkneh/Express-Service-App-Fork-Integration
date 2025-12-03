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
  const [selectedRows, setSelectedRows] = useState<{
    standard: Set<number>;
    sameDay: Set<number>;
    overnight: Set<number>;
  }>({
    standard: new Set(),
    sameDay: new Set(),
    overnight: new Set(),
  });

  const initialValues = {
    zone: "town",
    standard: 0,
    sameDay: 0,
    overnight: 0,
    costPerKm: 0,
    profitMargin: 0,
    standardWeightRanges: [{ from: "1", to: "3", price: 0 }],
    sameDayWeightRanges: [{ from: "1", to: "3", price: 0 }],
    overnightWeightRanges: [{ from: "1", to: "3", price: 0 }],
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
              weightRanges={values.standardWeightRanges}
              selectedRows={selectedRows.standard}
              onSelectionChange={(newSelection) => {
                setSelectedRows({ ...selectedRows, standard: newSelection });
              }}
              onAddRange={() => {
                const lastRange =
                  values.standardWeightRanges[
                    values.standardWeightRanges.length - 1
                  ];
                setFieldValue("standardWeightRanges", [
                  ...values.standardWeightRanges,
                  {
                    from: lastRange.to,
                    to: String(Number(lastRange.to) + 5),
                    price: 0,
                  },
                ]);
              }}
              onDeleteSelected={() => {
                const newRanges = values.standardWeightRanges.filter(
                  (_, i) => !selectedRows.standard.has(i)
                );
                setFieldValue("standardWeightRanges", newRanges);
                setSelectedRows({ ...selectedRows, standard: new Set() });
              }}
              fieldPrefix="standardWeightRanges"
              error={errors.standard}
              touched={touched.standard}
              incrementValue={5}
              isExpanded={expandedSection === "standard"}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === "standard" ? null : "standard"
                )
              }
            />

            <ServiceTypeSection
              serviceName="Same Day Service"
              serviceLabel="Same Day Service Price"
              fieldName="sameDay"
              weightRanges={values.sameDayWeightRanges}
              selectedRows={selectedRows.sameDay}
              onSelectionChange={(newSelection) => {
                setSelectedRows({ ...selectedRows, sameDay: newSelection });
              }}
              onAddRange={() => {
                const lastRange =
                  values.sameDayWeightRanges[
                    values.sameDayWeightRanges.length - 1
                  ];
                setFieldValue("sameDayWeightRanges", [
                  ...values.sameDayWeightRanges,
                  {
                    from: lastRange.to,
                    to: String(Number(lastRange.to) + 5),
                    price: 0,
                  },
                ]);
              }}
              onDeleteSelected={() => {
                const newRanges = values.sameDayWeightRanges.filter(
                  (_, i) => !selectedRows.sameDay.has(i)
                );
                setFieldValue("sameDayWeightRanges", newRanges);
                setSelectedRows({ ...selectedRows, sameDay: new Set() });
              }}
              fieldPrefix="sameDayWeightRanges"
              error={errors.sameDay}
              touched={touched.sameDay}
              incrementValue={5}
              isExpanded={expandedSection === "sameDay"}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === "sameDay" ? null : "sameDay"
                )
              }
            />

            <ServiceTypeSection
              serviceName="Overnight Service"
              serviceLabel="Overnight Service Price"
              fieldName="overnight"
              weightRanges={values.overnightWeightRanges}
              selectedRows={selectedRows.overnight}
              onSelectionChange={(newSelection) => {
                setSelectedRows({ ...selectedRows, overnight: newSelection });
              }}
              onAddRange={() => {
                const lastRange =
                  values.overnightWeightRanges[
                    values.overnightWeightRanges.length - 1
                  ];
                setFieldValue("overnightWeightRanges", [
                  ...values.overnightWeightRanges,
                  {
                    from: lastRange.to,
                    to: String(Number(lastRange.to) + 5),
                    price: 0,
                  },
                ]);
              }}
              onDeleteSelected={() => {
                const newRanges = values.overnightWeightRanges.filter(
                  (_, i) => !selectedRows.overnight.has(i)
                );
                setFieldValue("overnightWeightRanges", newRanges);
                setSelectedRows({ ...selectedRows, overnight: new Set() });
              }}
              fieldPrefix="overnightWeightRanges"
              error={errors.overnight}
              touched={touched.overnight}
              incrementValue={5}
              isExpanded={expandedSection === "overnight"}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === "overnight" ? null : "overnight"
                )
              }
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
