/**
 * How long a voice description is allowed to run.
 *
 * A voice row sets the description on one line beside the name, so anything longer
 * than this stops fitting and starts wrapping the list apart.
 */
export const VOICE_DESCRIPTION_MAX_LENGTH = 140;

/** Largest audio sample the clone endpoint accepts, in bytes. */
export const VOICE_SAMPLE_MAX_BYTES = 4 * 1024 * 1024;

/**
 * Shortest sample the clone endpoint accepts, in seconds.
 *
 * Quoted in prose across the create sheet, the recorder, the voices toolbar and the
 * landing page — if this number moves, those sentences have to move with it.
 */
export const VOICE_SAMPLE_MIN_SECONDS = 5;
