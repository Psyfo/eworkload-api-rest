export default class PassportConfig {
	// public static async JwtStrategy() {
	// 	const opts: any = {};
	// 	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	// 	opts.secretOrKey = 'secret';
	// 	opts.issuer = 'eworkload.dut.ac.za';
	// 	opts.audience = 'dut.ac.za';
	// 	passport.use(
	// 		new JwtStrategy(opts, function (jwt_payload, done) {
	// 			User.findOne({ userId: jwt_payload.sub }, function (err: any, user: any) {
	// 				if (err) {
	// 					return done(err, false);
	// 				}
	// 				if (user) {
	// 					return done(null, user);
	// 				} else {
	// 					return done(null, false);
	// 				}
	// 			});
	// 		})
	// 	);
	// }
}
