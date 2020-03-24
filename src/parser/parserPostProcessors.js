// Parser postprocessor functions are dynamically added to this module before constructing the parser.

// This module exists in order to avoid cyclic reference between modules
// Nearley parser dont take any arguments, it can only call external functions from different modules.
// I need parser to call external function to get value of call based on its label, that function exists in SpreadSheetStore module.
// Its the same module that creates and uses parsers so it would be a cyclic reference.
// To avoid that parser calls functions from this module, which are dynamically sets by parser wrapper.


// Alternative solution would be to allow cyclic reference, but this way it seems more isolated.
