import { getSelf } from '@/lib/auth-service';
import { db } from '@/lib/db';

// getSelf()라는 함수에 자신의 정보를 저장하고, 
// 다른 유저 정보는 otherUser라는 변수에 저장합니다.
// 그리고 otherUser.id가 self.id와 같다면 true를 반환합니다.
// 그렇지 않다면, db.follow.findFirst()를 호출하여 팔로우 정보를 찾습니다.
// 팔로우 정보가 있다면 true를 반환하고, 없다면 false를 반환합니다.


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

// 유저를 블락합니다. 
// db.block.create()를 호출하여 블락 정보를 생성합니다.
// 블락 정보를 생성할 때, blockerId와 blockedId를 설정합니다.
// blockerId는 자신의 id를, blockedId는 otherUser의 id를 설정합니다.
// 그리고 include 옵션을 통해 blocked 정보를 가져옵니다.
// 블락 정보를 생성하면, 블락 정보를 반환합니다.

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

// 유저를 언블락합니다.
// db.block.delete()를 호출하여 블락 정보를 삭제합니다.
// 블락 정보를 삭제할 때, id를 설정합니다.
// 그리고 include 옵션을 통해 blocked 정보를 가져옵니다.
// 블락 정보를 삭제하면, 블락 정보를 반환합니다.

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