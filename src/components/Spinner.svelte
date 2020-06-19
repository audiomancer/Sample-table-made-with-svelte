<style lang="scss">
	@import 'styles';

	.multi-spinner-container {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 300px;
		height: 300px;
		overflow: hidden;
	}

	$LINE_WIDTH: 15px;
	$DIMENSIONS: calc(100% - #{$LINE_WIDTH * 2});

	.multi-spinner {
		position: absolute;
		width: $DIMENSIONS;
		height: $DIMENSIONS;
		border: $LINE_WIDTH solid transparent;
		border-top-color: $SPINNER_COLOR;
		border-radius: 50%;
		animation: spin 5s cubic-bezier(0.17, 0.49, 0.96, 0.76) infinite;
	}

	@keyframes spin {
		from {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		to {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
</style>

<div class="multi-spinner-container">
	<div class="multi-spinner">
		<div class="multi-spinner">
			<div class="multi-spinner">
				<div class="multi-spinner">
					<div class="multi-spinner">
						<div class="multi-spinner" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
