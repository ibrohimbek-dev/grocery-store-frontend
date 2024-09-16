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

export const sweetErrorSmallHandling = async (err: any) => {
	const error = err.response?.data ?? err;
	const message = error?.message ?? Messages.SOMETHING_WENT_WRONG;
	await Swal.fire({
		icon: "error",
		text: message,
		showConfirmButton: false,
		toast: true,
		position: "top-end",				
    timerProgressBar: true,
    timer: 2000
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
		timer: duration,
		timerProgressBar: true,
		position: "center",
		backdrop: true,
		allowOutsideClick: false,
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

export const sweetConfirmationAlert = async (msg: string, confirmation: string, cancel: string) => {
	const { isConfirmed } = await Swal.fire({
		title: "Confirmation",
		text: msg,
		icon: "question",
		showCancelButton: true,
		confirmButtonText: confirmation,
		cancelButtonText: cancel,
	});

	return isConfirmed;
};
