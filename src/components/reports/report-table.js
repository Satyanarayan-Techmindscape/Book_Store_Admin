import React, { Fragment } from "react";
import data from "../../assets/data/reports";
import Datatable from "../common/datatable";

const ReportTable = () => {
	return (
		<Fragment>
			<div className="translation-list">
				<Datatable
					multiSelectOption={false}
					myData={data}
					notaction={false}
					pageSize={12}
					pagination={false}
					class="-striped -highlight"
				/>
			</div>
		</Fragment>
	);
};
export default ReportTable;
