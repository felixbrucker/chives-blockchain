from dataclasses import dataclass
from typing import List
from chives.types.blockchain_format.program import SerializedProgram
from chives.util.ints import uint32
from chives.util.streamable import Streamable, streamable


class GeneratorBlockCacheInterface:
    def get_generator_for_block_height(self, height: uint32) -> SerializedProgram:
        # Requested block must be a transaction block
        pass


@dataclass(frozen=True)
class CompressorArg:
    """`CompressorArg` is used as input to the Block Compressor"""

    block_height: uint32
    generator: SerializedProgram
    start: int
    end: int


@streamable
@dataclass(frozen=True)
class BlockGenerator(Streamable):
    program: SerializedProgram
    generator_refs: List[SerializedProgram]

    # the heights are only used when creating new blocks, never when validating
    block_height_list: List[uint32]
