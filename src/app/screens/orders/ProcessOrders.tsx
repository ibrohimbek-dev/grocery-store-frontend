import { TabPanel } from "@mui/lab";
import React from "react";

interface ProcessOrderProps {
	setValue: (input: string) => void;
}

const ProcessOrders = ({ setValue }: ProcessOrderProps) => {
	return (
		<TabPanel value="2">
			<div className="flex justify-between">
				<div className="text-2xl border-2 p-2 shadow-xl">ProcessOrders</div>				
			</div>
		</TabPanel>
	);
};

export default ProcessOrders;

// TODO: Shu qismidaman
