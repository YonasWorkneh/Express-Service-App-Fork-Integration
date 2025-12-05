"use client";

import { useState } from "react";
import {
  Search,
  Download,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import TablePagination from "@/components/common/TablePagination";

const batches = [
  {
    id: "#BATCH-001",
    date: "11 Feb, 2024",
    orders: "15 Orders",
    totalValue: "$450.00",
    destination: "Town",
    status: "Pending",
    createdBy: "John Doe",
    assignedDriver: "Driver A",
  },
  {
    id: "#BATCH-002",
    date: "12 Feb, 2024",
    orders: "22 Orders",
    totalValue: "$680.00",
    destination: "Regional",
    status: "In Transit",
    createdBy: "Jane Smith",
    assignedDriver: "Driver B",
  },
  {
    id: "#BATCH-003",
    date: "13 Feb, 2024",
    orders: "18 Orders",
    totalValue: "$520.00",
    destination: "International",
    status: "Completed",
    createdBy: "Mike Johnson",
    assignedDriver: "Driver C",
  },
  {
    id: "#BATCH-004",
    date: "14 Feb, 2024",
    orders: "10 Orders",
    totalValue: "$320.00",
    destination: "Town",
    status: "Pending",
    createdBy: "Sarah Williams",
    assignedDriver: "N/A",
  },
  {
    id: "#BATCH-005",
    date: "15 Feb, 2024",
    orders: "25 Orders",
    totalValue: "$750.00",
    destination: "Regional",
    status: "In Transit",
    createdBy: "David Brown",
    assignedDriver: "Driver D",
  },
  {
    id: "#BATCH-006",
    date: "16 Feb, 2024",
    orders: "12 Orders",
    totalValue: "$380.00",
    destination: "Town",
    status: "Completed",
    createdBy: "Emily Davis",
    assignedDriver: "Driver E",
  },
  {
    id: "#BATCH-007",
    date: "17 Feb, 2024",
    orders: "20 Orders",
    totalValue: "$600.00",
    destination: "International",
    status: "Pending",
    createdBy: "Robert Wilson",
    assignedDriver: "N/A",
  },
  {
    id: "#BATCH-008",
    date: "18 Feb, 2024",
    orders: "30 Orders",
    totalValue: "$920.00",
    destination: "Regional",
    status: "In Transit",
    createdBy: "Lisa Anderson",
    assignedDriver: "Driver F",
  },
  {
    id: "#BATCH-009",
    date: "19 Feb, 2024",
    orders: "14 Orders",
    totalValue: "$420.00",
    destination: "Town",
    status: "Completed",
    createdBy: "James Taylor",
    assignedDriver: "Driver G",
  },
  {
    id: "#BATCH-010",
    date: "20 Feb, 2024",
    orders: "28 Orders",
    totalValue: "$840.00",
    destination: "International",
    status: "Pending",
    createdBy: "Maria Garcia",
    assignedDriver: "N/A",
  },
];

const metrics = [
  {
    title: "Total Batches",
    value: "24",
    change: "18.5% last week",
    trend: "up",
    color: "orange",
  },
  {
    title: "Active Batches",
    value: "8",
    change: "12.3% last week",
    trend: "up",
    color: "green",
  },
  {
    title: "Completed Batches",
    value: "16",
    change: "5.2% last week",
    trend: "up",
    color: "teal",
  },
  {
    title: "Total Orders in Batches",
    value: "194",
    change: "22.1% last week",
    trend: "up",
    color: "blue",
  },
];

const MiniChart = ({ color }: { color: string }) => {
  const colors = {
    orange: "stroke-orange-500",
    green: "stroke-green-500",
    red: "stroke-red-500",
    teal: "stroke-teal-500",
    blue: "stroke-blue-500",
  };

  return (
    <svg width="60" height="20" viewBox="0 0 60 20" className="ml-auto">
      <path
        d="M2 18 L8 12 L14 15 L20 8 L26 11 L32 5 L38 9 L44 3 L50 7 L56 2"
        fill="none"
        strokeWidth="1.5"
        className={colors[color as keyof typeof colors]}
      />
      <path
        d="M2 18 L8 12 L14 15 L20 8 L26 11 L32 5 L38 9 L44 3 L50 7 L56 2 L60 20 L2 20 Z"
        fill="currentColor"
        className={`${colors[color as keyof typeof colors]} opacity-10`}
      />
    </svg>
  );
};

const tabs = [
  "All",
  "Pending",
  "In Transit",
  "Completed",
  "Cancelled",
];

export default function Main() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  // Calculate pagination
  const totalItems = batches.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedBatches = batches.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main>
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Batch Management
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="text-gray-600 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white !cursor-pointer"
              onClick={() => navigate("/batch/new")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Batch
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {metric.value}
                      <span className="text-lg font-normal text-gray-400 ml-1">
                        -
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span
                        className={
                          metric.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <MiniChart color={metric.color} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-10 mb-6">
          <div className="flex items-center space-x-1 bg-[#edeaea24] rounded-md p-2">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className={`hover:bg-white cursor-pointer ${
                  activeTab === tab
                    ? "bg-white text-gray-900 "
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>
          {/* Search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-4 text-gray-400 h-4 w-4" />
            <Input placeholder="Search batches..." className="pl-10 pr-3 w-full py-6" />
          </div>
        </div>

        {/* Batches Table */}
        <Card className="bg-white">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Batch ID
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </div>
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Orders Count
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Total Value
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Destination
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Status
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Created By
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Assigned Driver
                </TableHead>
                <TableHead className="text-gray-600 font-medium">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBatches.map((batch, index) => (
                <TableRow
                  key={index}
                  className="border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    navigate(`/batch/details/${batch.id.replace("#BATCH-", "")}`)
                  }
                >
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    <Button
                      variant="ghost"
                      className="p-0 text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      {batch.id}
                    </Button>
                  </TableCell>
                  <TableCell className="text-gray-600">{batch.date}</TableCell>
                  <TableCell className="text-gray-900">
                    {batch.orders}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {batch.totalValue}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {batch.destination}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        batch.status === "Completed"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : batch.status === "In Transit"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                      }
                    >
                      {batch.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {batch.createdBy}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {batch.assignedDriver}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle batch action
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Card>
      </main>
    </div>
  );
}

