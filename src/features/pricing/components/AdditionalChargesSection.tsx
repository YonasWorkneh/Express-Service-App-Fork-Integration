import { Field } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DriverCommissionTable from "./DriverCommissionTable";

interface DriverCommission {
  category: string;
  costPerKm: number;
  fixedCost: number;
  driverCost: number;
}

interface AdditionalChargesSectionProps {
  profitMarginError?: string;
  profitMarginTouched?: boolean;
  driverCommission: DriverCommission[];
}

export default function AdditionalChargesSection({
  profitMarginError,
  profitMarginTouched,
  driverCommission,
}: AdditionalChargesSectionProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-4 mb-6">
      <h2 className="text-lg font-medium mb-4">Additional Charges</h2>
      <div>
        <Label className="mb-1">Profit Margin (%)</Label>
        <Field
          as={Input}
          type="number"
          step="0.01"
          name="profitMargin"
          placeholder="Enter profit margin percentage"
          className={`py-2 !w-1/2 ${
            profitMarginError && profitMarginTouched ? "border-red-500" : ""
          }`}
        />
        {profitMarginError && profitMarginTouched && (
          <p className="text-red-500 text-sm mt-1">{profitMarginError}</p>
        )}
      </div>

      <DriverCommissionTable driverCommission={driverCommission} />
    </div>
  );
}
