import { getSelf } from '@/lib/auth-service';
import { db } from '@/lib/db';

export const isBlockedByUser = async (id: string) => {
	try {
		const self = await getSelf();

		const otherUser = await db.user.findUnique({
			where: { id },
		});

		if (!otherUser) {
			throw new Error('유저를 찾을 수 없습니다.');
		}

		if (otherUser.id === self.id) {
			return false;
		}

		const existingBlock = await db.block.findUnique({
			where: {
				blockerId_blockedId: {
					blockerId: otherUser.id,
					blockedId: self.id,
				},
			},
		});

		return !!existingBlock;
	} catch {
		return false;
	}
};

export const blockUser = async (id: string) => {
	const self = await getSelf();

	if (self.id === id) {
		throw new Error('자기 자신을 차단할 수 없습니다.');
	}

	const otherUser = await db.user.findUnique({
		where: { id },
	});

	if (!otherUser) {
		throw new Error('유저를 찾을 수 없습니다.');
	}

	const existingBlock = await db.block.findUnique({
		where: {
			blockerId_blockedId: {
				blockerId: self.id,
				blockedId: otherUser.id,
			},
		},
	});

	if (existingBlock) {
		throw new Error('이미 차단된 유저입니다.');
	}

	const block = await db.block.create({
		data: {
			blockerId: self.id,
			blockedId: otherUser.id,
		},
		include: {
			blocked: true,
		},
	});

	return block;
};

export const unblockUser = async (id: string) => {
	const self = await getSelf();

	if (self.id === id) {
		throw new Error('자기 자신을 차단 할 수 없습니다.');
	}

	const otherUser = await db.user.findUnique({
		where: { id },
	});

	if (!otherUser) {
		throw new Error('User not found');
	}

	const existingBlock = await db.block.findUnique({
		where: {
			blockerId_blockedId: {
				blockerId: self.id,
				blockedId: otherUser.id,
			},
		},
	});

	if (!existingBlock) {
		throw new Error('차단되지 않은 유저입니다.');
	}

	const unblock = await db.block.delete({
		where: {
			id: existingBlock.id,
		},
		include: {
			blocked: true,
		},
	});

	return unblock;
};