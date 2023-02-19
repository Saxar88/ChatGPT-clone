"use client";

import {Toaster} from "react-hot-toast";

function ClientProvider() {
	return (
		<div className="mr-5">
			<Toaster position="top-right" />
		</div>
	);
}

export default ClientProvider;
