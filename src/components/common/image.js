import React from "react";

const Image = ({ data,width }) => {
	return (
		<div>
			<div className="d-flex">
				{data.map((res, i) => {
					return (
						<img
							src={res}
							alt=""
							width={width}
							key={i}
							className={!width?"img-fluid img-30 me-2 blur-up lazyloaded":'img-fluid'}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Image;
