import { registerUser } from "@/app/lib/actions";

export default function Page() {
	return (
		<form action={registerUser}>
			<input name="name" placeholder="Name" />

			<input name="email" placeholder="Email" />

			<input name="password" type="password" placeholder="Password" />

			<button>Create Account</button>
		</form>
	);
}
