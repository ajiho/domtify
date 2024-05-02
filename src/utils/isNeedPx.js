
const isNeedPx = (property) => {
	return /^[a-z]/.test(property) &&
		/^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/.test(property[0].toUpperCase() + property.slice(1));
}


export default isNeedPx;