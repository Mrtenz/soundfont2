import { GeneratorType } from './generator';

export enum ControllerType {
  /**
   * The controller moves linearly from the minimum to the maximum value, with the direction and
   * polarity specified by the modulator.
   */
  Linear = 0,

  /**
   * The controller moves in a concave fashion from the minimum to the maximum value, with the
   * direction and polarity specified by the modulator.
   *
   * `output = Math.log(Math.sqrt(value ** 2) / [max value] ** 2)`
   */
  Concave = 1,

  /**
   * The controller moves in a convex fashion from the minimum to the maximum value, with the
   * direction and polarity specified by the modulator. This is the same as the concave curve, but
   * with the start and end points reversed.
   */
  Convex = 2,

  /**
   * The controller output is at a minimum value while the controller input moves from the minimum
   * to half of the maximum, after which the controller output is at a maximum. The direction and
   * polarity are specified by the modulator.
   */
  Switch = 3
}

export enum ControllerPolarity {
  /**
   * The controller should be mapped with a minimum value of 0 and a maximum value of 1. It behaves
   * similar to the modulation wheel controller of the MIDI specification.
   */
  Unipolar = 0,

  /**
   * The controller should be mapped with a minimum value of -1 and a maximum value of 1. It
   * behaves similar to the pitch wheel controller of the MIDI specification.
   */
  Bipolar = 1
}

export enum ControllerDirection {
  /**
   * The direction of the controller should be from the minimum to the maximum value.
   */
  Increasing = 0,

  /**
   * The direction of the controller should be from the maximum to the minimum value.
   */
  Decreasing = 1
}

export enum ControllerPalette {
  /**
   * Use the general controller palette as described by the `Controller` enum.
   */
  GeneralController = 0,

  /**
   * Use the MIDI controller palette.
   */
  MidiController = 1
}

export enum Controller {
  /**
   * No controller is to be used.
   */
  NoController = 0,

  /**
   * The controller source to be used is the velocity value which is sent from the MIDI note-on
   * command.
   */
  NoteOnVelocity = 2,

  /**
   * The controller source to be used is the key number value which was sent from the MIDI note-on
   * command.
   */
  NoteOnKeyNumber = 3,

  /**
   * The controller source to be used is the poly pressure amount that is sent from the MIDI
   * poly-pressure command.
   */
  PolyPressure = 10,

  /**
   * The controller source to be used is the channel pressure amount that is sent from the MIDI
   * channel-pressure command.
   */
  ChannelPressure = 13,

  /**
   * The controller source to be used is the pitch wheel amount which is sent from the MIDI pitch
   * wheel command.
   */
  PitchWheel = 14,

  /**
   * The controller source to be used is the pitch wheel sensitivity amount which is sent from the
   * MIDI RPN 0 pitch wheel sensitivity command.
   */
  PitchWheelSensitivity = 16,

  /**
   * The controller source is the output of another modulator. This is only supported as `value`,
   * not as `valueSource`.
   */
  Link = 127
}

export interface ControllerValue {
  /**
   * The type of modulator.
   */
  type: ControllerType;

  /**
   * The polarity of the modulator.
   */
  polarity: ControllerPolarity;

  /**
   * The direction of the modulator.
   */
  direction: ControllerDirection;

  /**
   * The controller palette used for the modulator.
   */
  palette: ControllerPalette;

  /**
   * The index of the general or MIDI controller. If the palette is set to `GeneralController`,
   * this refers to a type in the `Controller` type. Otherwise, its a MIDI continuous controller.
   */
  index: Controller | number;
}

export enum TransformType {
  /**
   * The output value of the multiplier is fed directly to the summing node of the given
   * destination.
   */
  Linear = 0,

  /**
   * The output value of the multiplier is to be the absolute value of the input value, as defined
   * by the relationship:
   *
   * `output = Math.sqrt(input ** 2)` or simply `output = Math.abs(input)`
   */
  Absolute = 2
}

export interface Modulator {
  /**
   * Destination generator.
   */
  id: GeneratorType;

  /**
   * Source modulator.
   */
  source: ControllerValue;

  /**
   * Degree of modulation.
   */
  value: number;

  /**
   * Source controls value of first.
   *
   * TODO: Description is unclear. Should be improved.
   */
  valueSource: ControllerValue;

  /**
   * Transform applied to source.
   */
  transform: TransformType;
}

/**
 * The default modulators at instrument level. Implementing these is up to the consumer of this
 * library. To override these modulators, other modulators have to be defined explicitly.
 */
export const DEFAULT_INSTRUMENT_MODULATORS: Modulator[] = [
  // MIDI note-on velocity to initial attenuation
  {
    id: GeneratorType.InitialAttenuation,
    source: {
      type: ControllerType.Concave,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Decreasing,
      palette: ControllerPalette.GeneralController,
      index: Controller.NoteOnVelocity
    },
    value: 960,
    valueSource: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.GeneralController,
      index: Controller.NoController
    },
    transform: TransformType.Linear
  },

  // MIDI note-on velocity to filter cutoff
  {
    id: GeneratorType.InitialFilterFc,
    source: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Decreasing,
      palette: ControllerPalette.GeneralController,
      index: Controller.NoteOnVelocity
    },
    value: -2400, // cents
    valueSource: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.GeneralController,
      index: Controller.NoController
    },
    transform: TransformType.Linear
  },

  // MIDI channel pressure to vibrato LFO pitch depth
  {
    id: GeneratorType.VibLFOToPitch,
    source: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.GeneralController,
      index: Controller.ChannelPressure
    },
    value: 50, // cents / max excursion
    valueSource: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.GeneralController,
      index: Controller.NoController
    },
    transform: TransformType.Linear
  },

  // MIDI continuous controller 1 to vibrato LFO pitch depth
  {
    id: GeneratorType.VibLFOToPitch,
    source: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.MidiController,
      index: 1
    },
    value: 50,
    valueSource: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.GeneralController,
      index: Controller.NoController
    },
    transform: TransformType.Linear
  },

  // MIDI continuous controller 7 to initial attenuation
  {
    id: GeneratorType.InitialAttenuation,
    source: {
      type: ControllerType.Concave,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Decreasing,
      palette: ControllerPalette.MidiController,
      index: 7
    },
    value: 960,
    valueSource: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.GeneralController,
      index: Controller.NoController
    },
    transform: TransformType.Linear
  },

  // MIDI continuous controller 10 to pan position
  {
    id: GeneratorType.InitialAttenuation,
    source: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Bipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.MidiController,
      index: 10
    },
    value: 1000, // tenths of a percent
    valueSource: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.GeneralController,
      index: Controller.NoController
    },
    transform: TransformType.Linear
  },

  // MIDI continuous controller 11 to initial attenuation
  {
    id: GeneratorType.InitialAttenuation,
    source: {
      type: ControllerType.Concave,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Decreasing,
      palette: ControllerPalette.MidiController,
      index: 11
    },
    value: 960,
    valueSource: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.GeneralController,
      index: Controller.NoController
    },
    transform: TransformType.Linear
  },

  // MIDI continuous controller 91 to reverb effects send
  {
    id: GeneratorType.ReverbEffectsSend,
    source: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.MidiController,
      index: 91
    },
    value: 200, // tenths of a percent
    valueSource: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.GeneralController,
      index: Controller.NoController
    },
    transform: TransformType.Linear
  },

  // MIDI continuous controller 93 to chorus effects send
  {
    id: GeneratorType.ChorusEffectsSend,
    source: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.MidiController,
      index: 93
    },
    value: 200, // tenths of a percent
    valueSource: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.GeneralController,
      index: Controller.NoController
    },
    transform: TransformType.Linear
  },

  // MIDI pitch wheel to initial pitch controlled by MIDI pitch wheel sensitivity
  {
    id: GeneratorType.CoarseTune,
    source: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Bipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.GeneralController,
      index: Controller.PitchWheel
    },
    value: 12700, // cents
    valueSource: {
      type: ControllerType.Linear,
      polarity: ControllerPolarity.Unipolar,
      direction: ControllerDirection.Increasing,
      palette: ControllerPalette.GeneralController,
      index: Controller.PitchWheelSensitivity
    },
    transform: TransformType.Linear
  }
];
