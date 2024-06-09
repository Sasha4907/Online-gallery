export default function BackgroundImage({ url = "gallery.png" }) {
	return (
		<img
			className="fixed inset-0 w-full h-full overflow-hidden object-cover z-[-1] [transform:scale(1.039)]"
			loading="lazy"
			alt=""
			src={`/${url}`}
		/>
	)
}