/** SweetAlertHandling **/
import Swal from "sweetalert2";
import { Messages } from "./config";

export const sweetErrorHandling = async (err: any) => {
	const error = err.response?.data ?? err;
	const message = error?.message ?? Messages.SOMETHING_WENT_WRONG;
	await Swal.fire({
		icon: "error",
		text: message,
		showConfirmButton: false,
	});
};

export const sweetPopupErrorHandling = async (
	msg: string,
	duration: number = 2000
) => {
	await Swal.fire({
		icon: "error",
		text: msg,
		showConfirmButton: false,
		timer: duration,
	});
};

export const sweetTopSuccessAlert = async (
	msg: string,
	duration: number = 2000
) => {
	await Swal.fire({
		icon: "success",
		title: msg,
		showConfirmButton: true,
		confirmButtonText: "OK",
		timer: duration, // Optional: This will still allow the alert to auto-close after the duration
		timerProgressBar: true,
		position: "center", // Center the alert
		backdrop: true, // Optional: Adds a backdrop
		allowOutsideClick: false, // Prevents closing by clicking outside
	});
};

export const sweetTopSmallErrorAlert = async (
	msg: string,
	duration: number = 2000
) => {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: duration,
		timerProgressBar: true,
	});

	Toast.fire({
		icon: "error",
		title: msg,
	}).then();
};

export const sweetTopSmallSuccessAlert = async (
	msg: string,
	duration: number = 2000
) => {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: duration,
		timerProgressBar: true,
	});

	Toast.fire({
		icon: "success",
		title: msg,
	}).then();
};

export const sweetTopSmallInfoAlert = async (
	msg: string,
	duration: number = 2000
) => {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: duration,
		timerProgressBar: true,
	});

	Toast.fire({
		icon: "info",
		title: msg,
	}).then();
};

export const sweetFailureProvider = (
	msg: string,
	show_button: boolean = false,
	forward_url: string = ""
) => {
	Swal.fire({
		icon: "error",
		title: msg,
		showConfirmButton: show_button,
		confirmButtonText: "OK",
	}).then(() => {
		if (forward_url !== "") {
			window.location.replace(forward_url);
		}
	});
};
